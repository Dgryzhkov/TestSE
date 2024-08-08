import {makeAutoObservable, runInAction} from 'mobx';
import {fetchCuratedPhotos} from '../api/api';
import {AxiosError} from 'axios';
import {ReactNode} from 'react';

interface Photo {
  alt: ReactNode;
  photographer: ReactNode;
  src: any;
  id: string;
  url: string;
}

class PhotoStore {
  photos: Photo[] = [];
  page = 1;
  loading = false;
  error: string | undefined;
  showModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPhotos() {
    runInAction(() => {
      this.loading = true;
      this.error = undefined;
    });

    try {
      const newPhotos: Photo[] = await fetchCuratedPhotos(this.page);
      runInAction(() => {
        this.photos.push(...newPhotos);
        this.page += 1;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        if (error instanceof Error) {
          this.error = 'Ошибка загрузки фотографий';
        }
        if (error instanceof AxiosError && error.response) {
          if (error.response.status >= 500 || error.response.status === 522) {
            this.showModal = true;
          }
        }
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  reset() {
    runInAction(() => {
      this.photos = [];
      this.page = 1;
    });
  }

  closeModal() {
    runInAction(() => {
      this.showModal = false;
    });
  }
}

const photoStore = new PhotoStore();
export default photoStore;

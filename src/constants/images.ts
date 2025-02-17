import UnavailableImage from '@/images/unavailable-image.webp';
import ErrorImage from '@/images/error-image.webp';

const ImageStore = {
  UnavailableImage,
  ErrorImage,
};

const IMAGE_BLUR_SRC = {
  DEFAULT:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHBJREFUKFNjVLLL+s9ABGA08q0gTqFjdMt/BgZGBgYGkHrcNGNg1iTiTIwvn/efkZGR4T/IXEYGLPR/BpA8Y37bGriJMIUwF8D5IEfVTdn5nwgnMjD2LT5GnGfmbrxMnGfWHHjwn5GBESlwQC7B5AMARJY5e6eVQIcAAAAASUVORK5CYII=',
};

const IMAGE_FALLBACK_SRC = {
  DEFAULT: UnavailableImage,
};

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export {
  ImageStore,
  IMAGE_FALLBACK_SRC,
  IMAGE_BLUR_SRC,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
};

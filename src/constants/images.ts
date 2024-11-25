import UnavailableImage from '@/images/unavailable-image.webp';

const ImageStore = {
  UnavailableImage,
};

const IMAGE_BLUR_SRC = {
  DEFAULT:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHBJREFUKFNjVLLL+s9ABGA08q0gTqFjdMt/BgZGBgYGkHrcNGNg1iTiTIwvn/efkZGR4T/IXEYGLPR/BpA8Y37bGriJMIUwF8D5IEfVTdn5nwgnMjD2LT5GnGfmbrxMnGfWHHjwn5GBESlwQC7B5AMARJY5e6eVQIcAAAAASUVORK5CYII=',
};

const IMAGE_FALLBACK_SRC = {
  DEFAULT: UnavailableImage,
};

export { ImageStore, IMAGE_FALLBACK_SRC, IMAGE_BLUR_SRC };

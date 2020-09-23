import tinify from 'tinify';

const sizeOf = require('image-size');
const bufferSizeOf = require('buffer-image-size');

export interface ITinifyAdapterParams {
  tinifyKey: string;
  method: string;
}

interface IResizeParams {
  width: number;
  height: number;
  options: any;
}

export const responsiveLoaderTinifyAdapter = ({
  tinifyKey,
  method = 'scale'
}: ITinifyAdapterParams) => {
  tinify.key = tinifyKey;

  return (imagePath: string) => {
    const image = tinify.fromFile(imagePath);
    const originalSize = sizeOf(imagePath);

    return {
      metadata: () => Promise.resolve(originalSize),
      resize: ({ width, options }: IResizeParams) =>
        new Promise((resolve, reject) => {
          console.log(originalSize);
          const resizeMethod = options.method || method;
          const newHeight = Math.round(
            originalSize.height * (width / originalSize.width)
          );

          const resized = image.resize({
            method: resizeMethod,
            width,
            ...(resizeMethod !== 'scale' ? { height: newHeight } : {})
          });

          resized.toBuffer((err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                data,
                width,
                height: bufferSizeOf(data).height
              });
            }
          });
        })
    };
  };
};

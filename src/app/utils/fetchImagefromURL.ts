import { proxyServer } from "./proxyServer";

export default async function fetchImagefromURL(url, targetID) {
  fetch(`${proxyServer}${url}`)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const blobImg = URL.createObjectURL(blob);

      // convert blobl to png
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = blobImg;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const blobImg = URL.createObjectURL(blob);
          console.log(blobImg);

          // blob to arrayBuffer
          const reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onloadend = () => {
            const arrayBuffer = reader.result;
            const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);

            parent.postMessage(
              {
                pluginMessage: {
                  type: "imgData",
                  data: uint8Array,
                  targetID: targetID,
                },
              },
              "*"
            );
          };
        }, "image/png");
      };
    });

  //   const arrayBuffer = await response.arrayBuffer();
  //   const uint8Array = new Uint8Array(arrayBuffer);

  //   parent.postMessage(
  //     {
  //       pluginMessage: {
  //         type: "imgData",
  //         data: uint8Array,
  //         targetID: targetID,
  //       },
  //     },
  //     "*"
  //   );
}

// export default async function fetchImagefromURL(url, targetID) {
//     await fetch(`${proxyServer}/${url}`)
//       .then((r) => {
//         try {
//           console.log(r);
//           return r.arrayBuffer();
//         } catch (error) {
//           console.error(error);
//         }
//       })
//       .then((a) => {
//         console.log(a);
//         parent.postMessage(
//           {
//             pluginMessage: {
//               type: "imgData",
//               data: new Uint8Array(a),
//               targetID: targetID,
//             },
//           },
//           "*"
//         );
//       });
//   }

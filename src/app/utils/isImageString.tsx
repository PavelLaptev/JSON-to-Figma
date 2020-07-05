export default function isImageString(string) {
    if (/(jpg|gif|png|JPG|GIF|PNG|JPEG|jpeg|WEBP|webp)$/.test(string)) {
        return true;
    } else {
        return false;
    }
}

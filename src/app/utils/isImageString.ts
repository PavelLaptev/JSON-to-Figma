export default function isImageString(string) {
    if (/.jpg|.gif|.png|.jpeg|.webp/gm.test(string.toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

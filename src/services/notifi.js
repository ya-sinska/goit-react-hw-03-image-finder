import { toast } from 'react-toastify';
export const notifi = (name) => toast.error(`Picture ${name} didn't find`, {
    autoClose: 3000,
});
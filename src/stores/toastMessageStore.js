import { defineStore } from 'pinia';
import Swal from 'sweetalert2'

export default defineStore ('toastMessage',{
    actions:{
        pushMessage(icon,title){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: false,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });

            Toast.fire({
                icon,
                title
            });
        }
    }
})


  
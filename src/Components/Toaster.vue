<script setup>
import { watch, ref, computed } from "vue";
import { Toast } from "bootstrap";
import { useNotificationStore } from "../stores/notificationStore";

const notification = useNotificationStore();

const toastElement = ref(null);

let toast = null;

const header = computed(() => {

    switch(notification.type){

        case "success":
            return "Success";

        case "danger":
            return "Error";

        case "warning":
            return "Warning";

        default:
            return "Information";

    }

});

watch(

    () => notification.show,

    (value)=>{

        if(!toast){

            toast = new Toast(toastElement.value,{
                delay:2500
            });

        }

        if(value){

            toast.show();

            setTimeout(()=>{

                notification.hide();

            },2500);

        }

    }

);
</script>

<template>

<div
    ref="toastElement"
    class="toast position-fixed bottom-0 end-0 m-3"
>

<div class="toast-header">

<strong
class="me-auto"
:class="{

'text-success':notification.type==='success',
'text-danger':notification.type==='danger',
'text-warning':notification.type==='warning',
'text-primary':notification.type==='info'

}"
>

{{ header }}

</strong>

<button
class="btn-close"
data-bs-dismiss="toast"
></button>

</div>

<div class="toast-body">

{{ notification.message }}

</div>

</div>

</template>
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {

    const show = ref(false);
    const message = ref("");
    const type = ref("success");

    function notify(msg, notificationType = "success") {

        message.value = msg;
        type.value = notificationType;
        show.value = true;

    }

    function hide() {

        show.value = false;

    }

    return {

        show,
        message,
        type,
        notify,
        hide

    };

});
<script setup>
import { ref } from "vue";
import { useSnippetStore } from "../stores/snippetStore";
import Toast from "./Toaster.vue";
import { useNotificationStore } from "../stores/notificationStore";
const notification = useNotificationStore();
const snippetStore = useSnippetStore();

const shareSnippet = async (id) => {

    try {

        const url = `${window.location.origin}/snippets/${id}`;

        await navigator.clipboard.writeText(url);

        notification.notify(
            "Snippet link copied successfully!",
            "success"
        );

    } catch (error) {

        notification.notify(
            "Failed to copy snippet link.",
            "danger"
        );

    }

};

const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    toastRef.value.showToast("✅ Code copied successfully!");
  } catch (err) {
    toastRef.value.showToast("❌ Failed to copy code.");
  }
};

defineProps({
  snippet: {
    type: Object,
    required: true,
  },
  snippet: {
    type: Object,
    required: true
  },
  showEditDelete: {
    type: Boolean,
    default: true
  }
});

defineEmits(["view", "edit", "delete"]);
</script>



<template>
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <h5 class="card-title fw-bold">
        {{ snippet.title }}
      </h5>
      <span class="badge bg-success mb-2">
        {{ snippet.language }}
      </span>
      <p class="card-text mt-2">
        {{ snippet.description }}
      </p>
      <div class="mb-2">
        <span
          v-for="tag in snippet.tags"
          :key="tag"
          class="badge bg-secondary me-1"
        >
          #{{ tag }}
        </span>
      </div>
      <p class="mb-1">
        <strong>Visibility:</strong>
        {{ snippet.visibility }}
      </p>
      <p class="text-muted small">
        Created: {{ snippet.createdAt }}
      </p>

    </div>
   <div class="card-footer bg-white">
      <div class="row g-2">
        <div :class="showEditDelete ? 'col-4' : 'col-6'">
          <button
            class="btn btn-outline-primary btn-sm w-100"
            @click="$emit('view', snippet._id)"
          >
            View
          </button>
        </div>

        <div
          v-if="showEditDelete"
          class="col-4"
        >
            <button
              class="btn btn-outline-warning btn-sm w-100"
              @click="$emit('edit', snippet._id)"
            >
              Edit
            </button>
        </div>

        <div
          v-if="showEditDelete"
          class="col-4"
        >
            <button
              class="btn btn-outline-danger btn-sm w-100"
              @click="$emit('delete', snippet._id)"
            >
              Delete
            </button>
      </div>

    <div :class="showEditDelete ? 'col-4' : 'col-6'">
      <button
        class="btn btn-outline-danger btn-sm w-100"
        @click="snippetStore.toggleFavorite(snippet._id)"
      >
        {{ snippetStore.isFavorite(snippet._id)
            ? "❤️ Remove"
            : "🤍 Favorite"
        }}
      </button>
    </div>

    <div :class="showEditDelete ? 'col-4' : 'col-6'">
      <button
        class="btn btn-outline-success btn-sm w-100"
        @click="copyCode(snippet.code)"
      >
        📋 Copy
      </button>
    </div>

    <div :class="showEditDelete ? 'col-4' : 'col-6'">
      <button
        class="btn btn-outline-info btn-sm w-100"
        @click="shareSnippet(snippet._id)"
      >
        🔗 Share
      </button>
    </div>

  </div>
</div>
  </div>

  <Toast ref="toastRef" />
</template>


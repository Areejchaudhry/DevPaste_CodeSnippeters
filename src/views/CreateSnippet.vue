<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSnippetStore } from "../stores/snippetStore";

const router = useRouter();
const route = useRoute();

const snippetStore = useSnippetStore();

const isEdit = !!route.params.id;

const form = reactive({

    title: "",
    language: "",
    description: "",
    code: "",
    tags: "",
    visibility: "public"

});

onMounted(async () => {

    if (isEdit) {

        await snippetStore.getSnippet(route.params.id);

        const snippet = snippetStore.currentSnippet;

        form.title = snippet.title;
        form.language = snippet.language;
        form.description = snippet.description;
        form.code = snippet.code;
        form.tags = snippet.tags.join(", ");
        form.visibility = snippet.visibility;

    }

});

const saveSnippet = async () => {


    console.log("Button clicked");
    console.log(form);

   

    const snippet = {

        ...form,

        tags: form.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag)

    };

    let success = false;

    if (isEdit) {

        success = await snippetStore.updateSnippet(
            route.params.id,
            snippet
        );

    } else {

        success = await snippetStore.createSnippet(
            snippet
        );

    }

    if (success) {

        notification.notify(
            isEdit
                ? "Snippet updated successfully!"
                : "Snippet created successfully!",
            "success"
        );

        router.push("/MySnippets");

    }

};

const clearForm = () => {

    form.title = "";
    form.language = "";
    form.description = "";
    form.code = "";
    form.tags = "";
    form.visibility = "public";

};

</script>

<template>
    <div class="snippet-container">
        <div class="card">
            <h2 class="text-center mb-4">

                {{ isEdit ? "Edit Snippet" : "Create New Snippet" }}

            </h2>
            <form @submit.prevent="saveSnippet">
                <div class="col-md-12">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" v-model="form.title" placeholder="Give Title to Your Code Snippet">
                </div>
                <div class="col-md-12">  
                    <label class="form-label">Language</label>
                    <select class="form-select" v-model="form.language" >
                        <option disabled value="">Select Language</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="Javascript">JavaScript</option>
                        <option value="Java">Java</option>
                        <option value="C#">C#</option>
                        <option value="Vue.js">Vue.js</option>
                        <option value="JSON">JSON</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="PHP">PHP</option>
                        <option value="Python">Python</option>
                        <option value="SQL">SQL</option>
                    </select>
                </div>   
                <div class="col-md-12">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="3" v-model="form.description" placeholder="Briefly Explain your Code"></textarea>
                </div> 
                <div class="col-md-12">
                    <label class="form-label">Code</label>
                    <textarea  rows="12" class="form-control code-area" v-model="form.code" placeholder="Paste Your Code here"></textarea>
                </div> 
                <div class="col-md-12">
                    <label class="form-label">Tags</label>
                    <input type="text" class="form-control" v-model="form.tags" placeholder="Write suitable Tags for this snippet"/>
                </div> 
                <label class="form-label">Select Visibility:</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="public" v-model="form.visibility">
                    <label class="form-check-label">
                        Public
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="private" v-model="form.visibility">
                    <label class="form-check-label">
                        Private
                    </label>
                </div>

                <div class="d-flex gap-2 mt-3">

                    <button type="submit"
                    class="btn btn-success flex-fill">
                       {{ isEdit ? "Update Snippet" : "Create Now" }}
                    </button>

                    <button type="button" @click="clearForm"
                    class="btn btn-secondary flex-fill">
                        Clear
                    </button>

            </div>

            </form>

            
            
        </div>
    </div>

</template>

<style scoped>
.snippet-container{
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    margin-top: 20px;
}
h2 {

    font-weight: bold;

    color: #198754;
}
.form-check{
    margin-top: 10px;
}
.card{
    width: 100%;
    max-width: 1000px;
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
.form-control {
    height: 50px;
    border-radius: 10px;
}
.code-area{
    min-height:300px;
    font-family: Consolas, monospace;
}
.btn {
    margin-top: 20px;
    height: 50px;

    font-size: 1.1rem;

    border-radius: 10px;
}
.form-label{
    margin-top: 10px;
}
</style>
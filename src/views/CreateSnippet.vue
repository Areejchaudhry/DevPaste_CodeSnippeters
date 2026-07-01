<script setup>
import {ref} from 'vue'
const title = ref('')
const language = ref('')
const description = ref('')
const code = ref('')
const tags = ref('')
const visibility = ref('')
function createsnippet(){
    if(title.value === ''){
        alert('Title is required')
        return
    }

    if(language.value === ''){
        alert('Please select a language')
        return
    }

    if(code.value === ''){
        alert('Code cannot be empty')
        return
    }

    alert('Snippet Created Successfully')
}

</script>

<template>
    <div class="snippet-container">
        <div class="card">
            <h2 class="text-center mb-4">Create New Snippet</h2>
            <form @submit.prevent="createsnippet">
                <div class="col-md-12">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-control" v-model="title" placeholder="Give Title to Your Code Snippet">
                </div>
                <div class="col-md-12">  
                    <label class="form-label">Language</label>
                    <select class="form-select" v-model="language" >
                        <option selected>All Languages</option>
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
                    <textarea class="form-control" rows="3" v-model="description" placeholder="Briefly Explain your Code"></textarea>
                </div> 
                <div class="col-md-12">
                    <label class="form-label">Code</label>
                    <textarea  rows="12" class="form-control code-area" v-model="code" placeholder="Paste Your Code here"></textarea>
                </div> 
                <div class="col-md-12">
                    <label class="form-label">Tags</label>
                    <input type="text" class="form-control" v-model="tags" placeholder="Write suitable Tags for this snippet"/>
                </div> 
                <label class="form-label">Select Visibility:</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="public" v-model="visibility">
                    <label class="form-check-label">
                        Public
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="private" v-model="visibility">
                    <label class="form-check-label">
                        Private
                    </label>
                </div>

            </form>

            <div class="d-flex gap-2 mt-3">

                    <button
                    class="btn btn-success flex-fill">
                        Create Now
                    </button>

                    <button
                    class="btn btn-secondary flex-fill">
                        Clear
                    </button>

            </div>
            
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
<script setup>
</script>

<template>
    <div class="container-fluid mt-4 div-main">
      <div class="row">
            <!-- Sidebar for lists of snippets to select from -->
            <div class="col-lg-3">
                <div class="snippet-sidebar">
                    <h4>Popular Snippets</h4>
                    <ul class="list-group">
                        <li class="list-group-item">Navbar</li>
                        <li class="list-group-item">Footer</li>
                        <li class="list-group-item">Register Form</li>
                        <li class="list-group-item">Login Form</li>
                        <li class="list-group-item">Sidebar</li>
                        <li class="list-group-item">Vue-Router</li>  
                        <li class="list-group-item">Product Card</li>   
                        <li class="list-group-item">Interactive cart</li> 
                        <li class="list-group-item">Payment Module</li>                   
                    </ul>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="hero-section">
                    <div class="overlay">
                        <h1>Save, Organize & Share Code</h1>
                        <p>DevPaste helps students manage code snippets and share with others.</p>
                        <button class="btn btn-success me-2">Explore Snippets</button>
                        <button class="btn btn-outline-light">Get Started</button>
                    </div>
                </div>
            </div>
      </div>
    </div>
</template>

<style scoped>
.hero-section {

  height: 500px;

  background-image: url('C:\Users\Admin\OneDrive\Desktop\VueProject\DevPaste\DEVPASTE\src\Assets\coding.jpg');

  background-size: cover;
  background-position: center;

  border-radius: 15px;

  position: relative;

  overflow: hidden;
}

.overlay {

  background: rgba(0,0,0,0.55);

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 50px;

  color: white;
}

.overlay h1 {

  font-size: 3rem;
  font-weight: bold;
}

.overlay p {

  font-size: 1.2rem;
  max-width: 600px;
}

.snippet-sidebar {

  background: white;

  border-radius: 15px;

  padding: 20px;

  box-shadow:
  0 2px 10px rgba(0,0,0,0.1);
}

.list-group-item {

  cursor: pointer;
  transition: 0.3s;
}

.list-group-item:hover {

  background: #198754;
  color: white;
}
.div-main{
  padding-bottom: 30px;
}
</style>
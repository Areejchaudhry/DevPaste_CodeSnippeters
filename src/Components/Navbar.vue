<script setup>
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
            <router-link class="navbar-brand fw-bold" to="/" >DevPaste </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div>
                <form class="d-flex search-form">
                    <input class="form-control me-2" type="search" placeholder="Search snippets..." >
                    <button class="btn btn-success" type="submit">Search</button>
                </form>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav" >
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/myprofile">My Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/MySnippets">My Snippets</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/favorites">Favorites</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<style scoped>

.navbar {
    padding-top: 30px;
    padding-bottom: 30px;
}

.navbar-brand {
  font-size: 1.6rem;
  letter-spacing: 1px;
}

.nav-link {
  font-size: 1rem;
  margin: 0 8px;
  transition: 0.3s;
}

.nav-link:hover {
  color: #28a745 !important;
}

.search-form {
  min-width: 280px;
}

.form-control {
  border-radius: 8px;
}

.btn-success {
  border-radius: 8px;
}

</style>

<script></script>
<template>
    <footer class="text-center text-lg-start bg-body-tertiary text-muted footer-main">
        <section >
            <div>
                <a href="https://facebook.com/" class="me-4 text-reset"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/" class="me-4 text-reset"><i class="fab fa-twitter"></i></a>
                <a href="https://google.com/" class="me-4 text-reset"><i class="fab fa-google"></i></a>
                <a href="https://instagram.com/" class="me-4 text-reset"><i class="fab fa-instagram"></i></a>
                <a href="https://linkedin.com/" class="me-4 text-reset"><i class="fab fa-linkedin"></i></a>
                <a href="https://github.com/" class="me-4 text-reset"><i class="fab fa-github"></i></a>
            </div>
        </section>
        <section>
            <div class="container text-center text-md-start mt-5">
                <div class="row mt-3">
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">
                            <i class="fas fa-gem me-3"></i>DevPaste
                        </h6>
                        <p>
                            Save, organize and share code snippets with fellow developers
                            and software engineering students.
                        </p>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Technologies</h6>
                        <p><router-link to="/" class="text-reset"> Vue.js</router-link></p>
                        <p><router-link to="/" class="text-reset"> Node.js</router-link></p>
                        <p><router-link to="/" class="text-reset"> Express.js</router-link></p>
                        <p><router-link to="/" class="text-reset"> Bootstrap</router-link></p>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Useful Links</h6>
                        <p><router-link to="/" class="text-reset"> Home</router-link></p>
                        <p><router-link to="/dashboard" class="text-reset">Dashboard</router-link></p>
                        <p><router-link to="/MySnippets" class="text-reset">My Snippets</router-link></p>
                        <p><router-link to="/favourites" class="text-reset">Favourites</router-link></p>
                    </div>

                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">Contact</h6>

                        <p>
                            <i class="fas fa-home me-3"></i>
                            Software Engineering Department
                        </p>

                        <p>
                            <i class="fas fa-envelope me-3"></i>
                            support@devpaste.com
                        </p>

                        <p>
                            <i class="fas fa-phone me-3"></i>
                            +92 010 456546
                        </p>

                        <p>
                            <i class="fas fa-code me-3"></i>
                            Built with Vue.js & Node.js
                        </p>
                    </div>

                </div>
            </div>
        </section>

        <div class="text-center p-4"
             style="background-color: rgba(0, 0, 0, 0.05);">
            © 2026 Copyright:
            <span class="text-reset fw-bold">
                DevPaste
            </span>
        </div>
    </footer>
</template>  

<style>
.footer-main{
    padding-top: 20px;
}
</style>
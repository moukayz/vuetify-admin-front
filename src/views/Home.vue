<template>
  <v-container id="home" full-height class="px-0">
    <aside>
      <nav>
        <ul>
          <li><a href="/dashboard" class="dark-text">主页</a></li>
          <li><a href="/audit" class="dark-text">审计</a></li>
          <li><a href="/vuls" class="dark-text">漏洞</a></li>
          <li><a href="#" class="dark-text">用户</a></li>
        </ul>
      </nav>
    </aside>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
#home {
  padding: 0;
}

aside {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white !important;
  transition: all 0.5s ease;
  z-index: 2;
}

nav {
  text-align: center;
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav ul li {
  align-items: center;
  flex: 1;
  line-height: 20vh;
}

nav ul li a {
  font-size: 1.5em;
  transition: all 0.5s ease;
  display: block;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  caret-color: rgba(0, 0, 0, 0.5);
}

nav ul li a:hover {
  color: rgba(0, 0, 0, 0.9);
  caret-color: rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

nav ul li a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

nav ul li a:before {
  content: "";
  position: absolute;
  width: 50%;
  height: 2px;
  bottom: 0;
  left: 25%;
  background: black;
  color: rgba(0, 0, 0, 0.5);
  caret-color: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  transition: all 0.3s ease-in-out 0s;
}

@media screen and (min-width: 600px) {
  nav ul li a {
    font-size: 3em;
  }
}

.white-text {
  color: #e5e9ec !important;
  caret-color: #f4f4f4 !important;
}

.dark-text {
  color: rgba(0, 0, 0, 0.5);
  caret-color: black !important;
}
</style>

<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label>Email :</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input type="password" v-model="password" />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('token', response.data.access_token);
        console.log(response);
        this.$router.push('/folders');
      } catch (error) {
        console.error('Erreur de connexion:', error);
      }
    },
  },
};
</script>

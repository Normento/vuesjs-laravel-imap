<template>
  <div>
    <h2>Détails du message</h2>
    <p><strong>Sujet :</strong> {{ message.subject }}</p>
    <p><strong>De :</strong> {{ message.from }}</p>
    <p><strong>Date :</strong> {{ message.date }}</p>
    <p><strong>Corps :</strong></p>
    <div v-html="message.body"></div>

    <div v-if="message.attachments && message.attachments.length > 0">
      <h3>Pièces jointes</h3>
      <ul>
        <li v-for="(attachment, index) in message.attachments" :key="index">
          <a @click.prevent="downloadAttachment(attachment)">{{ attachment.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MessageDetailView',
  data() {
    return {
      message: {},
    };
  },
  props: ['folder_name', 'message_uid'],
  async created() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/mail-accounts/1/folders/${this.folder_name}/messages/${this.message_uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.message = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du message:', error);
    }
  },

  methods: {
    formatSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Byte';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },

    downloadAttachment(attachment) {
      const link = document.createElement('a');
      link.href = `data:application/octet-stream;base64,${attachment.content}`;
      link.download = attachment.name;
      link.click();
    }
  }
};
</script>

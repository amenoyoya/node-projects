const app = {
  data() {
    return {
      text: 'hello, world'
    }
  },
  main: () => {
    alert(this.data.text);
  }
};

app.main();

<template>
  <div id="app">
    <my-component></my-component>
    <div v-if="addName == true">
      <label>
        name:
        <input type="text" v-model="name">
      </label>
      <label>
        age:
        <input type="text" v-model="age">
      </label>
      <button @click="submitName()">add</button>
      <br>
      <button @click="deactivate">deactivate</button>
    </div>
    <div v-else>
      <label>
        add Name
        <button @click="activate">activate</button>
      </label>
    </div>
    <hr>

    <div>
      <ul>
        <li v-for="pName of names" v-bind:key="pName['.key']">
          <div v-if="!pName.edit">
            <p>
              <span v-if="pName.name == 'john'" style="color:red;">{{pName.name}} <br> {{pName.age}}</span>
              <span v-else>{{pName.name}} <br> {{pName.age}}</span> 
              <!-- <p>{{pName.details}}</p> -->
            </p>
            <button @click="removeName(pName['.key'])">remove</button>
            <button @click="editName(pName['.key'])">edit</button>
          </div>
          <div v-else>
            <p>{{pName.name}} <br> {{pName.age}}</p>
            <input type="text" v-model="pName.name">
            <input type="text" v-model="pName.age">
            <button @click="saveEdit(pName)">save</button>
            <button @click="cancelEdit(pName['.key'])">cancel</button>
          </div>
        </li>
      </ul>
    </div>
    <hr>
    <hr>

    <div style="width:300px; margin:auto;">
      <label>
        name: {{Rname}}
        <input type="text" v-model="Rname">
      </label>
      <hr>
      <label>
        details: {{Rdetails}}
        <input type="text" v-model="Rdetails">
      </label>
      <hr>
      <label>
        price: {{Rprice}}
        <input type="text" v-model="Rprice">
      </label>
      <hr>
      <label>
        days: {{Rdays}}
        <input type="text" v-model="Rdays">
      </label>
      <hr>
      <label>
        times: {{Rtimes}}
        <input type="text" v-model="Rtimes">
      </label>
      <hr>
      <label>
        categories: {{Rcategories}}
        <input type="text" v-model="Rcategories">
      </label>

      <button @click="addRestaurant()">Add Restaurant</button>
    </div>


  </div>
</template>

<script>
import { namesRef, personRef, restaurantRef } from './firebase';
import Child from './Header.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      name: '',
      age: '',
      addName: false,
      start: 0,
      Rname: '',
      Rdetails: '',
      Rprice: '',
      Rdays: '',
      Rtimes: '',
      Rcategories: ''
    }
  },
  methods: {
    addRestaurant() {
      if (this.Rname != '' && this.Rdetails != '') {
        restaurantRef.push({
          name: this.Rname,
          details: this.Rdetails,
          price: this.Rprice,
          days: this.Rdays,
          times: this.Rtimes,
          categories: this.Rcategories
        });
      }
      else {
        alert('you will need to enter a name and some details')
      }
      this.Rname = '';
      this.Rdetails = '';
      this.Rprice = '';
      this.Rdays = '';
      this.Rtimes = '';
      this.Rcategories = '';
    },
    submitName() {
      namesRef.push({ 
        name: this.name, 
        age: this.age, 
        edit: false 
      });
      personRef.push({
        name: this.name + " " + this.age
      });
      this.name = '';
      this.age = '';

    },
    removeName(key) {
      namesRef.child(key).remove();
    },
    editName(key) {
      namesRef.child(key).update({edit: true});
    },
    cancelEdit(key) {
      namesRef.child(key).update({edit: false});
    },
    saveEdit(person) {
      const key = person['.key'];
      namesRef.child(key).set({
        name: person.name, 
        age: person.age, 
        edit: false
      })
    },
    activate() {
      this.addName = true;
    },
    deactivate() {
      this.addName = false;
    }
  },
  firebase: {
    names: namesRef,
    person: personRef, 
    restaurants: restaurantRef
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
button {
  background-color:transparent;
  border:2px solid black;
}
</style>

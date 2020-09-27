"use strict";

function buildUrl () {
   
let now = new Date("2017-11-22")
 
let prev30days = new Date(now.setDate(now.getDate() - 30));
var month = prev30days.getUTCMonth() + 1; //months from 1-12
var day = prev30days.getUTCDate();
var year = prev30days.getUTCFullYear();

    return "https://api.github.com/search/repositories?q=created:%3E"+year+"-"+month+"-"+day+"&sort=stars&order=desc";
}

Vue.component('news-list', {
  props: ['results'],
  template: `
    <section>
<div class="blog-item" v-for="post in processedPosts">
    <a href="#">
        <div class="icon">
<img :src="post.owner.avatar_url"></img>
        </div>
        <div class="content">
            <div class="title">{{ post.name }} </div>
            <p>
           {{ post.description }}
            </p>

<ul class="one">
  <li class="rounded">Stars : {{ post.stargazers_count }}</li>
  <li class="rounded">Issues : {{ post.open_issues_count }}</li> 
</ul>
        </div>
        <div class="item-arrow">
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
<br><br>
              
    </a>

</div>

      </div>
  </section>
  `,
  computed: {
    processedPosts() {
    
      return this.results;
    }
  }
});

const vm = new Vue({
  el: '#app',
  data: {
    results: [],
   loading: true,
    title: ''
  },
  mounted () {
    this.getPosts('home');
  },
  methods: {
    getPosts() {
      let url =buildUrl();
        axios.get(url).then((response) => {
        this.loading = false;
        this.results = response.data.items;
        let title = "Trending Repos";
        this.title = title + "(" + response.data.total_count+ ")";
      }).catch((error) => { console.log(error); });
    }
      
      
      
  }
});
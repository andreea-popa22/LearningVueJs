var eventBus = new Vue()

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
      premium: {
        type: Boolean,
        required: true
      }
  },
  template: `
  <div class="product">
          
        <div class="product-image">
          <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ product }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
  
            <div class="color-box"
                 v-for="(variant, index) in variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 >
            </div> 
  
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>
  
         </div> 

         <product-tabs :reviews="reviews" :details="details" :shipping="shipping"></product-tabs>
        
      </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'NDR Style',
      description: 'A pair of warm, fuzzy socks',
      // image: './resources/green-socks.jpg',
      selectedVariant: 0,
      // inStock: false,
      // inventory: 9,
      onSale: true,
      // link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks'
      details: ["85% cotton", "15% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 1,
          variantColor: "Green",
          variantImage: './resources/green-socks.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2,
          variantColor: "Blue",
          variantImage: './resources/blue-socks.jpg',
          variantQuantity: 0
        }
      ],
      sizes: ['35-38', '39-41', '42-45'],
      reviews: []
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart: function() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct: function(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() { 
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!'
      } 
        return  this.brand + ' ' + this.product + ' are not on sale'
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      else {
        return "2.99$"
      }
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    })
  }
})

Vue.component('product-review', {
  template:`
  <form class="review-form" @submit.prevent="onSubmit">
  <p class="error" v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </p>
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review" ></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>

  <p>Would you recommend this product?</p>
  <label>
    Yes
    <input type="radio" value="Yes" v-model="recommend"/>
  </label>
  <label>
    No
    <input type="radio" value="No" v-model="recommend"/>
  </label>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>
  `,
  data() {
    return {
      name:null,
      review: null,
      rating: null,
      errors: [],
      recommend: null
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend){
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      }
      else {
        if(!this.name) this.errors.push('Name required.')
        if(!this.review) this.errors.push('Review required.')
        if(!this.rating) this.errors.push('Rating required.')
        if(!this.recommend) this.errors.push("Recommendation required.")
      }
    }
  }
})

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    },
    shipping: {
      type: String,
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  template: `
  <div>
    <span class="tab"
          :class="{ activeTab: selectedTab === tab}"
          v-for="(tab, index) in tabs" 
          :key="index"
          @click="selectedTab = tab">
          {{ tab }}
    </span>

    <div v-show="selectedTab === 'Reviews'">
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.name }}</p>
            <p>Rating:{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
      </ul>
    </div>

    <product-review v-show="selectedTab === 'Make a Review'"></product-review>

    <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>
  
    <ul v-show="selectedTab === 'Details'">
      <li v-for="detail in details">{{ detail }}</li>
    </ul>

  </div>
  `,
  data() {
    return {
      tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
      selectedTab: 'Reviews'
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeItem(id) {
      for(var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
           this.cart.splice(i, 1);
           break;
        }
      }
    }
  }
})

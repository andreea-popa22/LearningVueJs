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
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <p v-if="inStock">In Stock</p>
      <p v-else :class="{ outOfStock: !inStock }">Out Of Stock</p>
      <p>User is premium: {{ premium }}</p>
      <p>Shipping: {{ shipping }}</p>
      <p>{{ sale }}</p>
      <p>Details:</p>
      <product-details :details="details"></product-details>
      <p>Available colors:</p>
      <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
    </div>
    <p>Sizes:</p>
    <ul>
      <li v-for="size in sizes">{{ size }}</li>
    </ul>

    <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }">
            Add to Cart
    </button>
    <button @click="removeFromCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }">
            Remove from Cart
    </button>
    <div class="cart">
      <p>Cart({{cart}})</p>
    </div>
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
      cart: 0
    }
  },
  methods: {
    addToCart: function() {
      this.cart += 1
    },
    removeFromCart: function() {
      if (this.cart > 0){
        this.cart -= 1
      }
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
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false
  }
})

//Add a description to the data object with the value "A pair of warm, fuzzy socks". Then display the description using an expression in an p element, underneath the h1.

var app = new Vue({
  el: '#app',
  data: {
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
    }
  }
})
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const brandAssets = {
  logo: 'https://img.icons8.com/fluency/96/frying-pan.png',
  heroMain:
    'https://images.unsplash.com/photo-1556909190-eccf4a8bf97a?auto=format&fit=crop&w=900&q=80',
  menu: 'https://img.icons8.com/ios-filled/100/ffffff/menu--v1.png',
  stars: 'https://img.icons8.com/fluency/48/star.png',
}

const fallbackImages = {
  feature:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' rx='24' fill='%23fed7aa'/%3E%3Cpath d='M31 50h34v6H31zM31 38h34v6H31zM31 62h22v6H31z' fill='%23c2410c'/%3E%3C/svg%3E",
  product:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='480' viewBox='0 0 700 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ffedd5'/%3E%3Cstop offset='100%25' stop-color='%23fdba74'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='700' height='480' fill='url(%23g)'/%3E%3Crect x='260' y='160' width='180' height='160' rx='24' fill='%23ffffff' fill-opacity='0.9'/%3E%3Cpath d='M300 220h100v12H300zM300 244h100v12H300zM300 268h70v12h-70z' fill='%23c2410c'/%3E%3C/svg%3E",
  avatar:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112' viewBox='0 0 112 112'%3E%3Ccircle cx='56' cy='56' r='56' fill='%23fed7aa'/%3E%3Ccircle cx='56' cy='44' r='18' fill='%23fb923c'/%3E%3Cpath d='M24 94c5-18 17-27 32-27s27 9 32 27' fill='%23fb923c'/%3E%3C/svg%3E",
}

const handleImageError = (event, fallbackSrc) => {
  const img = event.currentTarget
  img.onerror = null
  img.src = fallbackSrc
}

const features = [
  {
    id: 1,
    icon: 'https://img.icons8.com/fluency/96/guarantee.png',
    title: 'Premium Quality',
    description:
      'Crafted from the finest materials to ensure durability and performance that lasts for years.',
  },
  {
    id: 2,
    icon: 'https://img.icons8.com/fluency/96/rocket.png',
    title: 'Innovation First',
    description:
      'Cutting-edge technology designed to make your cooking faster, easier, and more enjoyable.',
  },
  {
    id: 3,
    icon: 'https://img.icons8.com/fluency/96/discount.png',
    title: 'Affordable Prices',
    description:
      'Premium kitchen solutions at prices that fit your budget without compromising quality.',
  },
  {
    id: 4,
    icon: 'https://img.icons8.com/fluency/96/teacher.png',
    title: 'Expert Guidance',
    description:
      'Our kitchen experts are here to help you choose the perfect products for your needs.',
  },
  {
    id: 5,
    icon: 'https://img.icons8.com/fluency/96/delivery.png',
    title: 'Fast Delivery',
    description:
      'Get your kitchen essentials delivered quickly and safely to your doorstep.',
  },
  {
    id: 6,
    icon: 'https://img.icons8.com/fluency/96/privacy.png',
    title: 'Lifetime Support',
    description: '24/7 customer support and warranty coverage for your peace of mind.',
  },
]

const products = [
  {
    id: 1,
    category: 'cookware',
    name: 'Professional Stainless Steel Pan Set',
    image:
      'https://images.unsplash.com/photo-1584990347449-aecf6ac38f52?auto=format&fit=crop&w=700&q=80',
    price: '$189.99',
    rating: 4.9,
    reviews: 328,
  },
  {
    id: 2,
    category: 'knives',
    name: 'Premium Chef Knife Collection',
    image:
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=700&q=80',
    price: '$279.99',
    rating: 5.0,
    reviews: 215,
  },
  {
    id: 3,
    category: 'appliances',
    name: 'Smart Electric Kettle Pro',
    image:
      'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=700&q=80',
    price: '$89.99',
    rating: 4.8,
    reviews: 462,
  },
  {
    id: 4,
    category: 'cookware',
    name: 'Non-Stick Cookware Set',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80',
    price: '$149.99',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 5,
    category: 'knives',
    name: 'Damascus Steel Knife Set',
    image:
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=700&q=80',
    price: '$349.99',
    rating: 5.0,
    reviews: 92,
  },
  {
    id: 6,
    category: 'appliances',
    name: 'Digital Food Scale',
    image:
      'https://images.unsplash.com/photo-1516727003284-a96541e51e9c?auto=format&fit=crop&w=700&q=80',
    price: '$49.99',
    rating: 4.6,
    reviews: 341,
  },
  {
    id: 7,
    category: 'storage',
    name: 'Glass Storage Containers Set',
    image:
      'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=700&q=80',
    price: '$59.99',
    rating: 4.8,
    reviews: 278,
  },
  {
    id: 8,
    category: 'accessories',
    name: 'Multi-Function Chopper',
    image:
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=700&q=80',
    price: '$39.99',
    rating: 4.5,
    reviews: 156,
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Sarah Anderson',
    role: 'Home Chef',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    text: 'Prime Kitchen has completely transformed my cooking experience. The quality is outstanding and the service is exceptional!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Professional Cook',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    text: 'I switched all my kitchen tools to Prime Kitchen products. The difference in quality and performance is night and day.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Thompson',
    role: 'Food Blogger',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'As someone who uses kitchen equipment daily, I can confidently say Prime Kitchen offers the best value for money.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Rodriguez',
    role: 'Kitchen Enthusiast',
    image: 'https://randomuser.me/api/portraits/men/77.jpg',
    text: 'The customer support team went above and beyond to help me choose the right products. Highly recommended!',
    rating: 5,
  },
]

const categories = ['all', 'cookware', 'knives', 'appliances', 'storage', 'accessories']

function App() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter((product) => product.category === selectedCategory)
  }, [selectedCategory])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-orange-100/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <img src={brandAssets.logo} alt="Prime Kitchen logo" className="h-10 w-10 rounded-lg" />
            <span className="font-display text-xl font-semibold text-white">Prime Kitchen</span>
          </a>

          <nav
            className={`${
              isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 lg:translate-y-0 lg:opacity-100'
            } absolute left-4 right-4 top-[76px] rounded-2xl border border-orange-100 bg-white p-4 shadow-xl transition-all lg:static lg:flex lg:items-center lg:gap-8 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
          >
            <a href="#features" className="block py-2 font-medium text-zinc-700 hover:text-orange-600 lg:py-0 lg:text-zinc-100">
              Features
            </a>
            <a href="#products" className="block py-2 font-medium text-zinc-700 hover:text-orange-600 lg:py-0 lg:text-zinc-100">
              Products
            </a>
            <a href="#testimonials" className="block py-2 font-medium text-zinc-700 hover:text-orange-600 lg:py-0 lg:text-zinc-100">
              Reviews
            </a>
            <a href="#contact" className="block py-2 font-medium text-zinc-700 hover:text-orange-600 lg:py-0 lg:text-zinc-100">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/customer/login')} className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 lg:px-5 lg:py-2">
              Get Started
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="grid h-10 w-10 place-items-center rounded-full border border-zinc-700 bg-zinc-900 lg:hidden"
            >
              <img src={brandAssets.menu} alt="Menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#ffedd5_0%,#fff7ed_30%,#fafafa_70%)] px-6 py-20 lg:px-8">
        <div className="absolute -left-24 top-24 h-48 w-48 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -right-24 bottom-16 h-52 w-52 rounded-full bg-red-200/30 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full border border-orange-200 bg-white px-4 py-1 text-sm font-semibold text-orange-700">
              Designed For Modern Kitchens
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-zinc-900 md:text-5xl lg:text-6xl">
              Elevate Your <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Culinary</span> Experience
            </h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-600">
              Discover premium kitchen solutions that transform your cooking space into a chef&apos;s paradise. Quality, innovation, and style in every product.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => navigate('/customer/login')} className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 font-semibold text-white transition hover:scale-105">
                Shop Now
              </button>
              <button className="rounded-full border-2 border-orange-400 px-8 py-3 font-semibold text-orange-700 transition hover:bg-orange-50">
                Learn More
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-zinc-900">50K+</p>
                <p className="text-sm text-zinc-500">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">500+</p>
                <p className="text-sm text-zinc-500">Premium Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900">4.9</p>
                <p className="text-sm text-zinc-500">Average Rating</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={brandAssets.heroMain}
              alt="Modern kitchen setup"
              className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -left-6 top-8 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
              <img src="https://img.icons8.com/fluency/96/knife.png" alt="Professional knives" className="h-8 w-8" />
              <p className="font-semibold text-zinc-800">Professional Knives</p>
            </div>
            <div className="absolute -right-6 top-1/2 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
              <img src="https://img.icons8.com/fluency/96/frying-pan.png" alt="Cookware" className="h-8 w-8" />
              <p className="font-semibold text-zinc-800">Non-Stick Cookware</p>
            </div>
            <div className="absolute left-8 bottom-6 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg">
              <img src="https://img.icons8.com/fluency/96/smartphone-tablet.png" alt="Smart appliances" className="h-8 w-8" />
              <p className="font-semibold text-zinc-800">Smart Appliances</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-bold text-zinc-900">Why Choose Prime Kitchen</h2>
          <p className="mt-3 text-zinc-600">Everything you need for an exceptional cooking experience</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="h-12 w-12"
                onError={(event) => handleImageError(event, fallbackImages.feature)}
              />
              <h3 className="mt-5 text-xl font-semibold text-zinc-900">{feature.title}</h3>
              <p className="mt-3 text-zinc-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="products" className="bg-zinc-100/80 px-6 py-20 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-display text-4xl font-bold text-zinc-900">Featured Products</h2>
            <p className="mt-3 text-zinc-600">Handpicked collection of essential kitchen items</p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize transition ${
                  selectedCategory === category
                    ? 'border-orange-500 bg-orange-500 text-white'
                    : 'border-zinc-300 bg-white text-zinc-700 hover:border-orange-300 hover:text-orange-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                  onError={(event) => handleImageError(event, fallbackImages.product)}
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-zinc-900">{product.name}</h3>
                  <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600">
                    <img src={brandAssets.stars} alt="Rating" className="h-4 w-4" />
                    <span className="font-semibold text-zinc-800">{product.rating}</span>
                    <span>({product.reviews} reviews)</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xl font-bold text-zinc-900">{product.price}</p>
                    <button className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-amber-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="font-display text-4xl font-bold text-zinc-900">What Our Customers Say</h2>
          <p className="mt-3 text-zinc-600">Join thousands of satisfied customers worldwide</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover"
                  onError={(event) => handleImageError(event, fallbackImages.avatar)}
                />
                <div>
                  <h3 className="font-semibold text-zinc-900">{testimonial.name}</h3>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <img key={index} src={brandAssets.stars} alt="star" className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 leading-relaxed text-zinc-700">&quot;{testimonial.text}&quot;</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-zinc-900 px-6 py-20 text-zinc-100 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold">Get in Touch</h2>
            <p className="mt-4 max-w-lg text-zinc-300">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <img src="https://img.icons8.com/fluency/96/marker.png" alt="Address" className="h-7 w-7" />
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-zinc-300">123 Culinary Street, Kitchen City, KC 12345</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img src="https://img.icons8.com/fluency/96/phone.png" alt="Phone" className="h-7 w-7" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-zinc-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <img src="https://img.icons8.com/fluency/96/new-post.png" alt="Email" className="h-7 w-7" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-zinc-300">support@primekitchen.com</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-800/50 px-4 py-3 placeholder:text-zinc-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-800/50 px-4 py-3 placeholder:text-zinc-400"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-800/50 px-4 py-3 placeholder:text-zinc-400"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-600 bg-zinc-800/50 px-4 py-3 placeholder:text-zinc-400"
              required
            />
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.01]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-zinc-950 px-6 py-16 text-zinc-300 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img src={brandAssets.logo} alt="Prime Kitchen logo" className="h-9 w-9 rounded-lg" />
              <h3 className="font-display text-2xl font-semibold text-white">Prime Kitchen</h3>
            </div>
            <p className="mt-4 max-w-sm text-zinc-400">
              Your trusted source for premium kitchen solutions and cooking essentials.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-zinc-400">
              <li><a href="#features" className="hover:text-orange-400">Features</a></li>
              <li><a href="#products" className="hover:text-orange-400">Products</a></li>
              <li><a href="#testimonials" className="hover:text-orange-400">Reviews</a></li>
              <li><a href="#contact" className="hover:text-orange-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="mt-4 space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-orange-400">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-400">Shipping Info</a></li>
              <li><a href="#" className="hover:text-orange-400">Returns</a></li>
              <li><a href="#" className="hover:text-orange-400">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Newsletter</h4>
            <p className="mt-4 text-zinc-400">Subscribe to get special offers and kitchen tips.</p>
            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
              />
              <button className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-400">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} Prime Kitchen. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <img src="https://img.icons8.com/fluency/48/bank-card-back-side.png" alt="Card payment" className="h-6 w-6" />
            <img src="https://img.icons8.com/fluency/48/bank-building.png" alt="Bank transfer" className="h-6 w-6" />
            <img src="https://img.icons8.com/fluency/48/apple-pay.png" alt="Mobile payment" className="h-6 w-6" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

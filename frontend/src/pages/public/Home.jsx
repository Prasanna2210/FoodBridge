import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
<nav className="bg-white border-b">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* Logo */}
   <Link
  to="/"
  className="text-2xl font-bold text-green-600"
>
  FoodBridge
</Link>

    {/* Desktop Navigation */}
    <div className="hidden md:flex items-center gap-8 text-gray-600">
      <a href="#home" className="hover:text-green-600 transition">
        Home
      </a>

      <a href="#about" className="hover:text-green-600 transition">
        About
      </a>

      <a href="#how-it-works" className="hover:text-green-600 transition">
        How It Works
      </a>
    </div>

    {/* Desktop Buttons */}
    <div className="hidden md:flex items-center gap-3">
      <Link to="/login"
        className="px-4 py-2 text-green-600 font-medium hover:text-green-700"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Register
      </Link>
    </div>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden text-gray-700 text-2xl"
      onClick={() => {
        const menu = document.getElementById("mobile-menu");
        menu.classList.toggle("hidden");
      }}
    >
      ☰
    </button>
  </div>

  {/* Mobile Menu */}
  <div
    id="mobile-menu"
    className="hidden md:hidden border-t bg-white px-6 py-4"
  >
    <div className="flex flex-col gap-4">

      <a
        href="#home"
        className="text-gray-600 hover:text-green-600"
      >
        Home
      </a>

      <a
        href="#about"
        className="text-gray-600 hover:text-green-600"
      >
        About
      </a>

      <a
        href="#how-it-works"
        className="text-gray-600 hover:text-green-600"
      >
        How It Works
      </a>

      <hr />

      <a
        href="/login"
        className="text-green-600 font-medium"
      >
        Login
      </a>

      <a
        href="/register"
        className="bg-green-600 text-white text-center py-2 rounded-lg"
      >
        Register
      </a>

    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section
        id="home"
        className="px-8 py-20 bg-green-50"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-green-600 font-semibold mb-4">
              FOODBRIDGE
            </p>

            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Share Food.
              <br />
              Reduce Waste.
              <br />
              Help Communities.
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              FoodBridge connects food donors with people and
              organizations who need food, helping reduce food
              waste and support communities.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="/register"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Start Donating
              </a>

              <a
                href="/login"
                className="px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-100"
              >
                Find Food
              </a>
            </div>
          </div>


          {/* Hero visual */}

          <div className="flex justify-center">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

    <img
      src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
      alt="Healthy food"
      className="w-full h-72 object-cover"
    />

    <div className="p-6 text-center">
      <h3 className="text-2xl font-bold text-gray-800">
        Food For Everyone
      </h3>

      <p className="text-gray-500 mt-2">
        Connecting surplus food with those who need it.
      </p>
    </div>

  </div>
</div>

        </div>
      </section>


{/* About Section */}
<section
  id="about"
  className="px-6 md:px-8 py-20 bg-white"
>
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">

      <p className="text-green-600 font-semibold tracking-wide">
        ABOUT FOODBRIDGE
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
        Turning Surplus Food Into Support
      </h2>

      <p className="text-gray-600 mt-5 leading-7">
        Every day, large amounts of food are wasted while many people
        struggle to access nutritious meals. FoodBridge provides a
        platform where donors can share surplus food with recipients
        and organizations in need.
      </p>

    </div>

    {/* Impact Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

      {/* Card 1 */}
      <div className="bg-green-50 rounded-2xl p-7 text-center border border-green-100">
        <div className="text-4xl mb-4">
          🍱
        </div>

        <h3 className="text-xl font-bold text-gray-900">
          Reduce Food Waste
        </h3>

        <p className="text-gray-600 mt-3">
          Give surplus food a purpose instead of letting it go to waste.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-green-50 rounded-2xl p-7 text-center border border-green-100">
        <div className="text-4xl mb-4">
          🤝
        </div>

        <h3 className="text-xl font-bold text-gray-900">
          Connect Communities
        </h3>

        <p className="text-gray-600 mt-3">
          Connect food donors with people and organizations that need it.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-green-50 rounded-2xl p-7 text-center border border-green-100">
        <div className="text-4xl mb-4">
          ❤️
        </div>

        <h3 className="text-xl font-bold text-gray-900">
          Make an Impact
        </h3>

        <p className="text-gray-600 mt-3">
          Turn extra meals into meaningful support for your community.
        </p>
      </div>

    </div>

  </div>
</section>


{/* How It Works */}
<section
  id="how-it-works"
  className="px-6 md:px-8 py-20 bg-gray-50"
>
  <div className="max-w-6xl mx-auto">

    {/* Section Heading */}
    <div className="text-center max-w-2xl mx-auto">

      <p className="text-green-600 font-semibold tracking-wide">
        HOW IT WORKS
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
        Making Food Sharing Simple
      </h2>

      <p className="text-gray-600 mt-4">
        FoodBridge makes it easy for surplus food to reach people
        who need it through a simple four-step process.
      </p>

    </div>


    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-14">

      {/* Step 1 */}
      <div className="relative text-center">

        <div className="mx-auto w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
          01
        </div>

        <div className="text-4xl mt-6">
          🍱
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-4">
          Donate Food
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Donors can add surplus food with details such as
          quantity, type, location and expiry time.
        </p>

      </div>


      {/* Step 2 */}
      <div className="relative text-center">

        <div className="mx-auto w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
          02
        </div>

        <div className="text-4xl mt-6">
          🔍
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-4">
          Find Food
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Recipients can browse available donations and
          find food that matches their needs.
        </p>

      </div>


      {/* Step 3 */}
      <div className="relative text-center">

        <div className="mx-auto w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
          03
        </div>

        <div className="text-4xl mt-6">
          📝
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-4">
          Send Request
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Recipients can send a request to the donor for
          the food they would like to receive.
        </p>

      </div>


      {/* Step 4 */}
      <div className="relative text-center">

        <div className="mx-auto w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
          04
        </div>

        <div className="text-4xl mt-6">
          🤝
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-4">
          Connect & Share
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Donors review requests and approved donations
          can reach recipients in need.
        </p>

      </div>

    </div>


    {/* Bottom Message */}
    <div className="mt-14 text-center">

      <p className="text-gray-600">
        <span className="font-semibold text-green-600">
          Simple.
        </span>{" "}
        <span className="font-semibold text-green-600">
          Meaningful.
        </span>{" "}
        <span className="font-semibold text-green-600">
          Community-driven.
        </span>
      </p>

    </div>

  </div>
</section>
{/* Features Section */}
<section
  id="features"
  className="px-6 md:px-8 py-20 bg-white"
>
  <div className="max-w-6xl mx-auto">

    {/* Section Heading */}
    <div className="text-center max-w-2xl mx-auto">

      <p className="text-green-600 font-semibold tracking-wide">
        FEATURES
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
        Everything You Need to Share Food
      </h2>

      <p className="text-gray-600 mt-4 leading-7">
        FoodBridge provides simple tools that make food donation,
        discovery and community support easier.
      </p>

    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

      {/* Feature 1 */}
      <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition duration-300">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
          🍱
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-6">
          Easy Food Donation
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Quickly add surplus food with important details such as
          food type, quantity, location and expiry time.
        </p>

      </div>

      {/* Feature 2 */}
      <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition duration-300">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
          🔍
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-6">
          Find Available Food
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Recipients can browse available donations and find food
          that matches their requirements.
        </p>

      </div>

      {/* Feature 3 */}
      <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition duration-300">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
          🤝
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-6">
          Request & Connect
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Send food requests to donors and coordinate the sharing
          of approved donations.
        </p>

      </div>

      {/* Feature 4 */}
      <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition duration-300">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
          📊
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-6">
          Dashboard & Tracking
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Track donations, requests and their status through
          dedicated donor and recipient dashboards.
        </p>

      </div>

      {/* Feature 5 */}
      <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition duration-300">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
          🔐
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-6">
          Secure Authentication
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Role-based authentication keeps donor and recipient
          accounts secure and provides the right access to each user.
        </p>

      </div>

      {/* Feature 6 */}
      <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition duration-300">

        <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-3xl group-hover:scale-110 transition">
          🌱
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-6">
          Reduce Food Waste
        </h3>

        <p className="text-gray-600 mt-3 leading-6">
          Help prevent edible food from being wasted by connecting
          surplus food with people who need it.
        </p>

      </div>

    </div>

  </div>
</section>
      {/* CTA Section */}
<section className="px-6 md:px-8 py-20 bg-green-600">
  <div className="max-w-5xl mx-auto text-center">

    <p className="text-green-100 font-semibold tracking-wide">
      MAKE A DIFFERENCE
    </p>

    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
      Every Meal Shared Can Make an Impact
    </h2>

    <p className="text-green-50 max-w-2xl mx-auto mt-5 leading-7">
      Have surplus food? Share it with someone who needs it.
      Looking for food? Find available donations in your community.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

     <div className="flex flex-col sm:flex-row gap-4">

  <Link
    to="/register"
    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-center"
  >
    Start Donating
  </Link>

  <Link
    to="/register"
    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-center"
  >
    Find Food
  </Link>

</div>

    </div>

  </div>
</section>

{/* Footer */}
<footer className="bg-gray-900 text-gray-300">

  <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">

    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* Brand */}
      <div className="md:col-span-2">

        <h3 className="text-2xl font-bold text-white">
          FoodBridge
        </h3>

        <p className="text-gray-400 mt-4 max-w-md leading-6">
          Connecting surplus food with people who need it.
          Together, we can reduce food waste and build stronger
          communities.
        </p>

      </div>

      {/* Quick Links */}
      <div>

        <h4 className="text-white font-semibold">
          Quick Links
        </h4>

        <div className="flex flex-col gap-3 mt-4">

          <a
            href="#home"
            className="hover:text-white transition"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-white transition"
          >
            About
          </a>

          <a
            href="#how-it-works"
            className="hover:text-white transition"
          >
            How It Works
          </a>

          <a
            href="#features"
            className="hover:text-white transition"
          >
            Features
          </a>

        </div>

      </div>

      {/* Account */}
      <div>

        <h4 className="text-white font-semibold">
          Get Started
        </h4>

        <div className="flex flex-col gap-3 mt-4">

          <a
            href="/login"
            className="hover:text-white transition"
          >
            Login
          </a>

          <a
            href="/register"
            className="hover:text-white transition"
          >
            Register
          </a>

        </div>

      </div>

    </div>

    {/* Bottom Footer */}
    <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">

      <p className="text-sm text-gray-500">
        © 2026 FoodBridge. All rights reserved.
      </p>

      <p className="text-sm text-gray-500">
        Built to reduce food waste and support communities.
      </p>

    </div>

  </div>

</footer>

    </div>
  );
};

export default Home;
import Footer from '../ui/home/footer';
import Header from '../ui/home/header';

export default function About() {
  return (
    <div>
      <section>
        <Header />
      </section>
      <div className='px-4 py-8'>
        <h2 className='text-gray-900 lg:text-[4vw] text-[6vw] text-nowrap flex justify-center'>
          About Handcrafted Haven
        </h2>
        <p className='flex justify-center px-10'>
          Handcrafted Haven aims to revolutionize the way handcrafted items are
          discovered, appreciated, and acquired. Through Handcrafted Haven, we
          allow artisans to showcase their creativity and connect with a broader
          audience, we strive to foster a thriving community of passionate
          creators and conscious consumers. With its user-friendly features,
          secure e-commerce capabilities, and emphasis on customization and
          community engagement, Handcrafted Haven is set to become the go-to
          destination for those seeking unique, handcrafted treasures.
        </p>
      </div>
      <section>
        <Footer />
      </section>
    </div>
  );
}


import { useState } from "react";
import { Calendar, MapPin, Phone, Mail, Clock, Star, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppointmentModal from "@/components/AppointmentModal";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";

const Index = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@elitebarbershop.mk';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+38970987654';
  };

  const handleMapClick = () => {
    window.open('https://maps.google.com/?q=ул.+Васил+Главинов+10,+1000+Скопје', '_blank');
  };

  const services = [
    {
      id: 1,
      name: "Класично шишање",
      description: "Професионално мажко шишање со ножици и машинка",
      price: "500 ден",
      duration: "30 мин",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      name: "Брада и мустаќи",
      description: "Стилизирање и одржување на брада и мустаќи",
      price: "400 ден",
      duration: "25 мин",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      name: "Машинско шишање",
      description: "Модерно шишање со машинка во различни стилови",
      price: "400 ден",
      duration: "20 мин",
      image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      name: "Комплетен третман",
      description: "Шишање, брада, шампонирање и стилизирање",
      price: "800 ден",
      duration: "60 мин",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      name: "Бритвен",
      description: "Традиционално бритење со топла пена",
      price: "600 ден",
      duration: "40 мин",
      image: "https://images.unsplash.com/photo-1587904947123-7c5c9afcd4d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 6,
      name: "Детско шишање",
      description: "Пријатно шишање за деца до 12 години",
      price: "300 ден",
      duration: "25 мин",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const testimonials = [
    {
      name: "Стефан Јованов",
      text: "Најдобриот берберин во градот! Секогаш излегувам задоволен и со одлична фризура.",
      rating: 5
    },
    {
      name: "Марко Димитров",
      text: "Професионална услуга и пријатна атмосфера. Препорачувам на сите!",
      rating: 5
    },
    {
      name: "Александар Петков",
      text: "Одам тука веќе 3 години. Квалитетот е секогаш на највисоко ниво.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Scissors className="h-6 w-6 text-slate-600 mr-2" />
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800">
              Elite Barbershop
            </h1>
            <Scissors className="h-6 w-6 text-slate-600 ml-2" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Професионален берберски салон за мажи<br />
            <span className="text-slate-700 font-semibold">Стил, квалитет и традиција</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setShowAppointmentModal(true)}
              className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Закажи термин
            </Button>
            
            <Button 
              onClick={scrollToServices}
              variant="outline" 
              className="border-2 border-slate-700 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
            >
              Погледни услуги
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Откријте ја нашата палета од професионални берберски услуги
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                За нас
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Elite Barbershop е премиум берберски салон кој веќе 8 години им пружа 
                професионални услуги на мажите во Скопје. Нашиот тим од искусни бербери 
                комбинира традиционални техники со модерни трендови.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Во нашиот салон, секој клиент добива индивидуален третман. Создаваме 
                машка атмосфера каде што можете да се опуштите и да уживате во 
                квалитетната берберска услуга.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-700 mb-2">1000+</div>
                  <div className="text-gray-600">Задоволни клиенти</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-700 mb-2">8</div>
                  <div className="text-gray-600">Години искуство</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Берберски салон" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-200 rounded-full opacity-30"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-slate-100 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Што велат нашите клиенти
            </h2>
            <p className="text-xl text-gray-600">
              Задоволството на нашите клиенти е нашата најголема награда
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-slate-700 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Контактирајте не
            </h2>
            <p className="text-xl opacity-90">
              Спремни сме да ви помогнеме да изгледате одлично
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <CardTitle>Адреса</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>ул. Васил Главинов 10</p>
                <p>1000 Скопје</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>+389 70 987 654</p>
                <p>+389 2 987 654</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <CardTitle>Работно време</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p>Пон-Пет: 08:00-20:00</p>
                <p>Саб: 08:00-18:00</p>
                <p>Нед: 10:00-16:00</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={() => setShowAppointmentModal(true)}
              className="bg-white text-slate-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Закажи твој термин сега
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Scissors className="h-6 w-6 text-slate-400 mr-2" />
              <h3 className="text-2xl font-bold">Elite Barbershop</h3>
              <Scissors className="h-6 w-6 text-slate-400 ml-2" />
            </div>
            <p className="text-gray-400 mb-6">
              Професионален берберски салон за мажи
            </p>
            <div className="flex justify-center space-x-6">
              <Mail 
                className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer transition-colors" 
                onClick={handleEmailClick}
              />
              <Phone 
                className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer transition-colors" 
                onClick={handlePhoneClick}
              />
              <MapPin 
                className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer transition-colors" 
                onClick={handleMapClick}
              />
            </div>
            <p className="text-gray-500 text-sm mt-8">
              © 2024 Elite Barbershop. Сите права задржани.
            </p>
          </div>
        </div>
      </footer>

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
      />
    </div>
  );
};

export default Index;

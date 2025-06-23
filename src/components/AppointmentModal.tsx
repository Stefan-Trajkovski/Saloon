
import { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: ""
  });

  const services = [
    "Класично шишање",
    "Брада и мустаќи", 
    "Машинско шишање",
    "Комплетен третман",
    "Бритвен",
    "Детско шишање"
  ];

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast({
        title: "Грешка",
        description: "Ве молиме пополнете ги сите задолжителни полиња.",
        variant: "destructive"
      });
      return;
    }

    console.log("Appointment data:", formData);
    
    toast({
      title: "Терминот е закажан!",
      description: `Вашиот термин за ${formData.service} е закажан за ${formData.date} во ${formData.time}. Ќе ве контактираме за потврда.`,
    });
    
    onClose();
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-50 to-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-slate-600 mr-2" />
            Закажи термин
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Име и презиме *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-500"
                  placeholder="Внесете го вашето име"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Телефон *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="pl-10 border-slate-200 focus:border-slate-500"
                  placeholder="070 987 654"
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Е-маил
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 border-slate-200 focus:border-slate-500"
                placeholder="example@email.com"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-gray-700 font-medium">Услуга *</Label>
            <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
              <SelectTrigger className="border-slate-200 focus:border-slate-500">
                <SelectValue placeholder="Изберете услуга" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-gray-700 font-medium">
                Дата *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="border-slate-200 focus:border-slate-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <Label className="text-gray-700 font-medium">Време *</Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                <SelectTrigger className="border-slate-200 focus:border-slate-500">
                  <SelectValue placeholder="Изберете време" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              Откажи
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white"
            >
              Закажи термин
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;

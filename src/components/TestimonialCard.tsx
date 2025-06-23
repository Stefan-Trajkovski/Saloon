
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="h-full bg-gray-50 border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-700 mb-4 italic">
          "{testimonial.text}"
        </p>
        <p className="font-semibold text-slate-700">
          - {testimonial.name}
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;

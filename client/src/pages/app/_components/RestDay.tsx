import { Battery, Moon, Sun, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Exercise } from "@/types/general";

interface RestDayProps {
  exercise: Exercise;
}

export default function RestDay({ exercise }: RestDayProps) {
  return (
    <Card className="w-full mt-4 max-w-md mx-auto overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl bg-white border-2 border-green-200">
      <CardHeader className="bg-gradient-to-r from-green-100 to-green-200 pb-10 pt-6">
        <CardTitle className="text-4xl font-bold text-center text-green-800">
          REST DAY
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 -mt-6">
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-full p-4 shadow-lg -mt-12 mb-4">
            <Heart className="w-12 h-12 text-green-500" />
          </div>
          <div className="text-2xl font-semibold mb-6 text-green-700">
            {exercise.day}
          </div>
          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="flex flex-col items-center">
              <Moon className="w-8 h-8 text-indigo-400 mb-2" />
              <span className="text-sm text-gray-600">Rest</span>
            </div>
            <div className="flex flex-col items-center">
              <Battery className="w-10 h-10 text-green-500 mb-2" />
              <span className="text-sm text-gray-600">Recharge</span>
            </div>
            <div className="flex flex-col items-center">
              <Sun className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-sm text-gray-600">Recover</span>
            </div>
          </div>
          <div className="text-center text-lg max-w-xs text-gray-700 italic">
            "{exercise.description}"
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

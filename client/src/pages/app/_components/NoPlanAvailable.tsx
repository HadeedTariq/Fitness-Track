import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function NoPlanAvailable() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>No Plan Available</CardTitle>
        <CardDescription>
          It looks like you haven't set up a fitness plan yet.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button asChild variant={"destructive"}>
          <Link to="/dashboard">
            Go to Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

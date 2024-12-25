import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { planApi } from "../../../utils/axios";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function ExercisePlanCreator() {
  const [goal, setGoal] = useState<string>("");
  const { mutate: createPlan, isPending } = useMutation({
    mutationKey: ["createPlan"],
    mutationFn: async () => {
      if (!goal) {
        toast({
          title: "Please enter a goal",
          variant: "destructive",
        });
        return;
      }
      const { data } = await planApi.post("/create", { goal });
      return data;
    },
    onError: (err: any) => {
      toast({
        title: err.response.data.message || "Something went wrong",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      toast({
        title: data.message || "Plan Created successfully",
      });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="my-6 bg-red-500 hover:bg-red-600">
          Create Exercise Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create your plan</DialogTitle>
          <DialogDescription>
            Create your fitness plan now and get started with your journey
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goal" className="text-right">
              Goal
            </Label>
            <Input
              id="goal"
              placeholder="Weight Gain"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => createPlan()}
            disabled={isPending}
          >
            Create Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

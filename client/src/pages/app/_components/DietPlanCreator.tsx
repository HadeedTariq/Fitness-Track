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
import { useNavigate } from "react-router-dom";

export function DietPlanCreator() {
  const navigate = useNavigate();

  const [objective, setObjective] = useState<string>("");
  const { mutate: createDietPlan, isPending } = useMutation({
    mutationKey: ["createDietPlan"],
    mutationFn: async () => {
      if (!objective) {
        toast({
          title: "Please enter a objective",
          variant: "destructive",
        });
        return;
      }
      const { data } = await planApi.post("/create-diet", { objective });
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
        title: data.message || "Diet plan Created successfully",
      });
      setObjective("");
      setTimeout(() => {
        navigate("/dietSchedule");
      }, 1000);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="my-6 bg-green-500 hover:bg-green-600"
        >
          Create Diet Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create your plan</DialogTitle>
          <DialogDescription>
            Create your diet plan now and get started with your journey
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="objective" className="text-right">
              Objective
            </Label>
            <Input
              id="objective"
              placeholder="Lean Diet"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => createDietPlan()}
            disabled={isPending}
            className=" bg-green-500 hover:bg-green-600"
          >
            Create Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

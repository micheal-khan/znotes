"use client";
import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, ReactNode } from "react";
import { updateUserName } from "@/server/users";
import { useRouter } from "next/navigation";

interface EditProfileProps {
  profile: any; // 👈 replace `any` with your actual profile type if you have one
  setProfile: Dispatch<SetStateAction<any>>; // same here
  trigger: ReactNode;
}

export function EditProfile({
  profile,
  setProfile,
  trigger,
}: EditProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(profile);
  const router = useRouter();

  const handleChange = (e: { target: { id: string; value: any } }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    setProfile(formData);

    const updateUsername = await updateUserName(
      formData.fullName,
      profile.userId
    );

    if (!updateUsername.success) {
      console.error(updateUsername.message);
    } else {
      console.log("Profile updated successfully");
    }

    setIsOpen(false);
    router.refresh();
  };

  const handleOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    if (open) {
      setFormData(profile);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost">
            <Edit className="size-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="img" className="text-right">
              Image URL
            </Label>
            <Input
              id="img"
              value={formData.img}
              placeholder="Enter image URL"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              placeholder="Enter your Full Name"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={formData.email}
              disabled
              placeholder="Enter your Email Id"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="summary" className="text-right">
              Summary
            </Label>
            <Textarea
              id="summary"
              value={formData.summary}
              placeholder="Enter your summary"
              onChange={handleChange}
              className="col-span-3 h-20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

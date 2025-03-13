
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Form data:", data);
    
    // In a real application, you would send this data to your backend
    // For now, we'll just show a success toast and close the dialog
    
    toast({
      title: "Message sent!",
      description: "Thank you for contacting me. I'll get back to you soon.",
    });
    
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button id="open-contact-dialog" variant="outline" className="hidden">
          Contact Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-dark border border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Get in Touch</DialogTitle>
          <DialogDescription className="text-white/70">
            Fill out the form below and I'll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input 
                        placeholder="Your name" 
                        className="pl-10 bg-dark-light text-white border-primary/20 focus-visible:ring-primary" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input 
                        placeholder="Your email" 
                        className="pl-10 bg-dark-light text-white border-primary/20 focus-visible:ring-primary" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Message</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Textarea 
                        placeholder="Your message" 
                        className="pl-10 bg-dark-light text-white border-primary/20 focus-visible:ring-primary min-h-[120px]" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-dark">
              Send Message <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;

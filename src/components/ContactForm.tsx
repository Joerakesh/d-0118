
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mail, User, MessageSquare, Sparkles } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    console.log("Form data:", data);
    
    try {
      // Send form data to email using Email JS or a similar service
      // For this implementation, we'll use a serverless function via FormSubmit
      const response = await fetch("https://formsubmit.co/rakeshjoe52@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: "New Contact Form Submission from Portfolio",
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting me. I'll get back to you soon.",
      });
      
      form.reset();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button id="open-contact-dialog" variant="outline" className="hidden">
          Contact Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card border border-primary/20 neon-box">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            Get in Touch
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
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
                  <FormLabel className="text-foreground">Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input 
                        placeholder="Your name" 
                        className="pl-10 bg-dark-light text-foreground border-primary/20 focus-visible:ring-primary" 
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
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input 
                        placeholder="Your email" 
                        className="pl-10 bg-dark-light text-foreground border-primary/20 focus-visible:ring-primary" 
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
                  <FormLabel className="text-foreground">Message</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Textarea 
                        placeholder="Your message" 
                        className="pl-10 bg-dark-light text-foreground border-primary/20 focus-visible:ring-primary min-h-[120px]" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-dark button-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>Send Message <Send className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactForm;

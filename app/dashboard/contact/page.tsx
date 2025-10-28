"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function ContactManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setContacts(data);
        } else {
          toast.error("Failed to fetch contacts");
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        toast.error("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleView = (contact: Contact) => {
    setViewingContact(contact);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this contact? This action cannot be undone."
    );
    if (confirmed) {
      try {
        const response = await fetch(`/api/contact/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Contact deleted successfully");
          // Refresh contacts
          const refreshResponse = await fetch("/api/contact");
          const data = await refreshResponse.json();
          setContacts(data);
        } else {
          toast.error("Failed to delete contact");
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-2"></div>
            <div className="h-4 bg-muted rounded w-64"></div>
          </div>
        </div>
        <Card className="animate-fade-in animation-delay-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in animation-delay-400">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="animate-pulse h-8 bg-muted rounded"></TableHead>
                      <TableHead className="animate-pulse h-8 bg-muted rounded"></TableHead>
                      <TableHead className="animate-pulse h-8 bg-muted rounded"></TableHead>
                      <TableHead className="animate-pulse h-8 bg-muted rounded"></TableHead>
                      <TableHead className="animate-pulse h-8 bg-muted rounded w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-32"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-48"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-40"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-64"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-24"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-8 bg-muted rounded w-8"></div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Contact Management
          </h1>
          <p className="text-muted-foreground">
            View and manage incoming contact messages
          </p>
        </div>
      </div>

      {/* Search */}
      <Card className="animate-fade-in animation-delay-200">
        <CardHeader>
          <CardTitle className="text-lg">Search Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card className="animate-fade-in animation-delay-400">
        <CardHeader>
          <CardTitle>All Contacts ({filteredContacts.length})</CardTitle>
          <CardDescription>
            Review and manage contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message Preview</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {contact.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-muted-foreground break-all">
                        {contact.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">
                        {contact.subject}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">
                      {contact.message.substring(0, 100)}...
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleView(contact)}
                            className="gap-2 cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No contacts found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
            <DialogDescription>
              Full message from {viewingContact?.name}
            </DialogDescription>
          </DialogHeader>
          {viewingContact && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Name
                </Label>
                <p className="text-muted-foreground">{viewingContact.name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <p className="text-muted-foreground break-all">
                  {viewingContact.email}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Subject
                </Label>
                <p className="text-muted-foreground">
                  {viewingContact.subject}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Message
                </Label>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {viewingContact.message}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium text-foreground">
                  Date
                </Label>
                <p className="text-muted-foreground">
                  {new Date(viewingContact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

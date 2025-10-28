import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const BlogsSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
        <div className="h-10 bg-muted rounded w-40"></div>
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
                    <TableHead className="animate-pulse h-8 bg-muted rounded"></TableHead>
                    <TableHead className="animate-pulse h-8 bg-muted rounded w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="h-4 bg-muted rounded w-64"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-6 bg-muted rounded w-20"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-4 bg-muted rounded w-24"></div>
                      </TableCell>
                      <TableCell>
                        <div className="h-4 bg-muted rounded w-16"></div>
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
};

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client'; // Assuming this path is correct

export function UserSessionNavbar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: session, isLoading } = useQuery<{ user: { image?: string, name?: string }, [key: string]: any } | null>({ 
    queryKey: ['auth', 'session'],
    // No queryFn needed here as __root.tsx's loader populates the cache.
    // Stale time can be Infinity if data is only changed by mutations/root loader.
    // staleTime: Infinity, 
  });

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      // Invalidate the session query to trigger re-fetches or updates
      await queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
      // Optionally, refetch queries or reset query client if needed
      // await queryClient.refetchQueries({ queryKey: ['auth', 'session'] });
      navigate({ to: '/' }); // Navigate to home or a specific sign-out page
    } catch (error) {
      console.error("Sign out failed:", error);
      // Potentially show a notification to the user
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          {/* Could be a logo component or text */}
          MyApp
        </Link>
        {/* Example of other global navigation links */}
        {/* <Link to="/public-feed"><Button variant="ghost">Public Feed</Button></Link> */}
        {/* <Link to="/about"><Button variant="ghost">About</Button></Link> */}
      </div>
      <div className="flex items-center space-x-4">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading user...</div>
        ) : session && session.user ? (
          <>
            <Avatar className="h-9 w-9">
              <AvatarImage 
                src={session.user.image || undefined} 
                alt={session.user.name || 'User avatar'} 
              />
              <AvatarFallback className="text-sm">
                {session.user.name ? session.user.name.substring(0, 2).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-gray-700">
              Welcome, {session.user.name || 'User'}!
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/"> {/* Assuming '/' route handles sign-in prompt */}
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </Link>
            {/* Optionally, add a Sign Up button if your app supports it */}
            {/* <Link to="/signup">
              <Button variant="outline" size="sm">Sign Up</Button>
            </Link> */}
          </>
        )}
      </div>
    </nav>
  );
}

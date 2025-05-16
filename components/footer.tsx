export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 mt-16">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="p-1">
                <img src="https://res.cloudinary.com/dlyw0o11c/image/upload/v1747408803/bns-icon-logo-2025-05-14_m6cyzx.png" alt="bns logo" width="36" height="36" className="aspect-square" />
              </div>
              <span className="font-bold text-xl">Bahamut Name Service</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              The first domain service where you lock tokens instead of spending them.
              Your tokens, your domain, forever on the Bahamut blockchain.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">API</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Bahamut Blockchain</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Community</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Discord</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Bahamut Name Service. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition text-sm">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition text-sm">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
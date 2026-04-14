import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="flex justify-center items-center py-16">
      <div class="w-10 h-10 border-4 border-cife-soft border-t-cife-primary
                  rounded-full animate-spin">
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {}
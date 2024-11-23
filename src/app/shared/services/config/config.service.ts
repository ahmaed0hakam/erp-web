import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Direction, Languages } from '../../interfaces/direction';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  getLang(): Languages {
    if (this.isBrowser())
      return (localStorage?.getItem('lang') || environment.lang) as Languages

    return (environment.lang || 'ar') as Languages
  }

  /**
 * Determines the current secondary language setting from local storage or falls back to the default secondary language.
 * @returns {Languages} secLang The secondary language code, e.g., 'ar' | 'en'.
 */
  getSecLang(): Languages {
    if (this.isBrowser())
      return (localStorage?.getItem('secLang') || environment.secLang) as Languages;
    
    return (environment.secLang || 'en') as Languages
  }

  /**
   * Sets the language in local storage, updates the document's language attribute, and updates the translation service.
   * Also sets the text direction ('ltr' or 'rtl') based on the language.
   * @param {string} lang - The language code to set.
   */
  setLang(lang: Languages) {
    if (this.isBrowser()) {
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
     
      environment.lang = lang;
      this.translate.use(environment.lang);

      environment.direction = lang == 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir =  environment.direction;
      localStorage.setItem('direction', environment.direction);

      const secLang = lang == 'ar' ? 'en' : 'ar';
      localStorage.setItem('secLang', secLang);
    }
  }

  /**
   * Retrieves the text direction from local storage or falls back to the default direction.
   * @returns {Direction} The current text direction ('ltr' or 'rtl').
   */
  getDirection(): Direction{
    if(this.isBrowser())
      return (localStorage?.getItem('direction') || environment.direction) as Direction
    return (environment.direction || 'ltr') as Direction
  }


  /**
   * Checks if the current platform is a browser.
   * @returns {boolean} True if the platform is a browser, false otherwise.
   */
  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId)
  }
  
  /**
   * Checks if the current platform is a server.
   * @returns {boolean} True if the platform is a server, false otherwise.
   */
  isServer(): boolean {
    return isPlatformServer(this.platformId)
  }
}
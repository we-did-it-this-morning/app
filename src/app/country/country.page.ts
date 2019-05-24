import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MapService } from '../services/map.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  private loading = true;
  public countryUrl = null;
  public country;
  public severity;

  public severityStyles = {
    1: {
      icon: 'warning',
      color: 'red',
      hue: 300,
    },
    2: {
      icon: 'alert',
      color: 'yellow',
      hue: 130,
    },
    3: {
      icon: 'medkit',
      color: 'green',
      hue: 90,
    },
  };

  constructor(
    private api: ApiService,
    private map: MapService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const country = await this.api.get('country', {
      id: this.route.snapshot.paramMap.get('id'),
    });

    this.country = country;

    await Promise.all([
      this.drawCountry(),
      this.getCountryInfo(),
    ]);

    console.log('done loading');

    this.loading = false;
  }

  async getCountryInfo() {
    const malariaTypes = [];
    await Promise.all(this.country.malariaTypes.map(malariaTypeId => new Promise(async (resolve, reject) => {
      const malariaTypeInfo = await this.api.get('malaria-type', {
        id: malariaTypeId,
      });
      malariaTypes.push(malariaTypeInfo);
      resolve();
    })));
    console.log('got malaria types', malariaTypes);

    const maxSeverity = Math.min(3, ...malariaTypes.map(malariaType => malariaType.severity));
    const severityDetails = await this.api.get('severity', {
      level: maxSeverity,
    });
    this.severity = severityDetails;
  }

  async drawCountry() {
    const countryLatLng = await this.map.getCountryLatLng(this.country.name);
    console.log('countryLatLng', countryLatLng);
    const bounds = this.map.getZoomedOutBoundsForPoint(countryLatLng[0], countryLatLng[1]);
    console.log('bounds', bounds);

    this.countryUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${bounds.join(',')}
    `);
  }

}

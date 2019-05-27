import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
})
export class CountriesPage implements OnInit {
  public countrySearchTerm = '';
  private countries = [];
  public searchResults = [];

  constructor(
    private api: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.api.get('countries', {}).then(countries => {
      this.countries = countries;
      this.search(this.countrySearchTerm);
    });
  }

  onSearchChange($event) {
    console.log(this.countrySearchTerm);
    this.search(this.countrySearchTerm);
  }

  private search(term) {
    term = term.trim().toLowerCase();

    if (!term.length) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.countries
      .filter(country => country.name.toLowerCase().includes(term));
  }

  selectCountry(country) {
    this.router.navigate(['country', country.id]);
  }

}

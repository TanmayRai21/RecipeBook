import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingridients: Ingridient[] = [];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) {}
  ngOnInit() {
    this.ingridients = this.slService.getIngridients();
    this.subscription = this.slService.ingridientsChanged.subscribe(
      (ingridients: Ingridient[]) => {
        this.ingridients = ingridients;
      }
    );
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

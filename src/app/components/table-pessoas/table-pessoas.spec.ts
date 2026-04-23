import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePessoas } from './table-pessoas';

describe('TablePessoas', () => {
  let component: TablePessoas;
  let fixture: ComponentFixture<TablePessoas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePessoas],
    }).compileComponents();

    fixture = TestBed.createComponent(TablePessoas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

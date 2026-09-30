import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { of } from "rxjs";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";

describe("HeroDetailComponent", () => {
  let mockActivatedRoute;
  let mockHeroService;
  let mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => "3" } }
    };
    mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
    mockLocation = jasmine.createSpyObj(["back"]);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ]
    });
  })

  it("should render hero name in a h2 tag", () => {
    mockHeroService.getHero.and.returnValue(of({ id: 3, name: "SuperDude", strength: 100 }));
    const fixture = TestBed.createComponent(HeroDetailComponent);

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain("SUPERDUDE");
  })

  it("should call updateHero when save is called", fakeAsync(() => {
    mockHeroService.getHero.and.returnValue(of({ id: 3, name: "SuperDude", strength: 100 }));
    mockHeroService.updateHero.and.returnValue(of({}));
    const fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();

    fixture.componentInstance.save();
    tick(250);

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }))
})


// TODO Add reset view
// TODO Nudge the x-axis a bit higher and the y-axis a bit to the left
// TODO Add loading animation
// TODO Consider launching the component only on demand
// TODO Add more tests

import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-contact-map',
  templateUrl: './contact-map.component.html',
  styleUrls: ['./contact-map.component.css']
})
export class ContactMapComponent implements OnInit {

  // Set the dimensions and margins of the graph
  private margin = {top: 20, right: 20, bottom: 20, left: 30};
  private width = 600 - this.margin.left - this.margin.right;
  private height = 600 - this.margin.top - this.margin.bottom;

  @Input() accession: string;

  private svg;
  private x;
  private y;
  private n;
  private colors;
  private tooltip;
  private xLabels;
  private yLabels;
  private xAxis;
  private yAxis;
  private gX;
  private gY;


  private createSvg(): void {
    // Append the svg object to the body of the page
    this.svg = d3.select('#contact-map-container')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('class', 'contact-map-grid')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
      .call(d3
        .zoom()
        .scaleExtent([0.95, 10])
        .extent([[0, 10], [this.width, this.height]])
        .on('zoom', event => this.zoomed(event)));
  }

  private zoomed(event): void {
    d3.select('.contact-map-grid').attr('transform', event.transform);
  }

  // Get how many data points are per axis
  private setDimension(data): void {
    this.n = Number(data[data.length - 1].residueA);
  }

  // Make arrays to use as label
  private makeLabels(): Array<string> {
    return [...Array(this.n).keys()].map(d => (d + 1).toString());
  }

  private setLabels(): void {
    this.xLabels = this.makeLabels();
    this.yLabels = this.makeLabels();
  }

  private buildScales(): void {
    // Build x scale
    this.x = this.scaleXY(this.width, this.xLabels);

    // Build y scale
    this.y = this.scaleXY(this.height, this.yLabels);

    // Build color scale
    this.colors = d3.scaleLinear<string, number>()
      .range(['#69b3a2', 'white'])
      .domain([0, 20]);
  }

  private scaleXY(rangeEnd: number, domain: any): any {
    return d3
      .scaleBand()
      .range([0, rangeEnd])
      .domain(domain)
      .padding(0.01);
  }

  private buildAxes(): void {
    // Build x axis
    this.xAxis = this.setXYAxis('top', this.width);

    this.gX = this.svg.append('g')
      .attr('class', 'x axis')
      .call(this.xAxis);

    // Build y axis
    this.yAxis = this.setXYAxis('left', this.height);

    this.gY = this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis);
  }

  private setXYAxis(position: string, rangeEnd: number): any {
    const linear = d3.scaleLinear().range([0, rangeEnd]).domain([1, this.n]);
    let axis;
    if (position === 'top') {
      axis = d3.axisTop(linear);
    } else if (position === 'left') {
      axis = d3.axisLeft(linear);
    }
    return axis.ticks(15)
      .tickFormat(this.formatTicks)
      .tickSizeOuter(0);
  }

  // Join the data
  private joinData(data): void {
    this.svg.selectAll()
      .data(data, d => d.residueA + ':' + d.residueB)
      .enter()
      .append('rect')
      .attr('x', d => this.x(d.residueA))
      .attr('y', d => this.y(d.residueB))
      .attr('width', this.x.bandwidth())
      .attr('height', this.y.bandwidth())
      .style('fill', d => this.colors(d.distance))
      .style('cursor', 'help')
      .on('mouseover', d => this.mouseOver(d))
      .on('mousemove', d => this.mouseMove(d))
      .on('mouseleave', d => this.mouseLeave(d));
  }

  // Create the tooltip
  private createTooltip(): void {
    this.tooltip = d3.select('#contact-map-container')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('color', 'black');
  }

  // Update the location and the text of the tooltip based on cursor location
  private mouseMove(d: any): void {
    const data = d.target.__data__;
    this.tooltip
      .html('Distance between residue ' + data.residueA + ' and ' + data.residueB + ': <br><strong>' + data.distance + ' ??</strong>')
      .style('position', 'relative')
      .style('left', (d3.pointer(event)[0]) - 50 + 'px')
      .style('top', (d3.pointer(event)[1]) - this.height + 'px')
      .style('width', '250px');
  }

  // Turn the tooltip visible on mouseOver
  private mouseOver(d): void {
    this.mouseBehaviour(d, 1, .8, 'black');
  }

  // Turn the tooltip invisible on mouseLeave
  private mouseLeave(d: any): void {
    this.mouseBehaviour(d, 0, 1, 'none');
  }

  // Set tooltip for mouseOver and mouseLeave
  private mouseBehaviour(d: any, tooltipOpacity: number, targetOpacity: number, strokeColor: string): void {
    this.tooltip.style('opacity', tooltipOpacity);
    d3.select(d.target)
      .style('stroke', strokeColor)
      .style('opacity', targetOpacity);
  }

  // Draw utilities for axes ticks
  formatTicks(d: number): any {
    return d > 1000 ? d / 1000 + 'k' : d;
  }

  private createContactMap(data): void {
    this.setDimension(data);
    this.createSvg();
    this.setLabels();
    this.buildScales();
    this.buildAxes();
    this.joinData(data);
    this.createTooltip();
  }

  private readData(): void {
    // Read the data
    d3.csv('../assets/contact-maps/' + this.accession + '_distogram.csv').then(res => {
      this.createContactMap(res);
    });
  }

  ngOnInit(): void {
    this.readData();
  }

}

import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cmd: 'create' })
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'findAll' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'findOne' })
  findOne(@Payload('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'update' })
  update(
    // @Payload('id') id: string,
    @Payload() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'remove' })
  remove(@Payload('id') id: string) {
    return this.productsService.remove(+id);
  }

  @MessagePattern({ cmd: 'validateProducts' })
  validateProducts(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }
}
